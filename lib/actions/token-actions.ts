"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const COOLDOWN_MS = 6 * 60 * 60 * 1000; // 6 hours

const ACTION_TYPES = [
  "Node Ledger Audit",
  "Smart Contract Sync",
  "Staking Verification",
  "Chain Integrity Sweep",
  "Validator Cross-Check",
  "Merkle Root Reconciliation",
  "Token Supply Audit",
];



export async function getClaimStatus() {
  const session = await auth();
  if (!session?.user?.id) {
    return { status: "unauthenticated" as const };
  }

  const userId = session.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, lastLoginAt: true, tokenBalance: true },
  });

  if (!user) return { status: "unauthenticated" as const };

  const transactions = await prisma.tokenTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const lastClaimedAt = transactions.length > 0 ? transactions[0].createdAt : null;
  // Cooldown starts from last claim, or from login if never claimed
  const cooldownStart = lastClaimedAt ?? user.lastLoginAt;
  const nextAvailableAt = cooldownStart
    ? new Date(cooldownStart.getTime() + COOLDOWN_MS)
    : null;
  const now = new Date();
  const isReady = !nextAvailableAt || now >= nextAvailableAt;

  return {
    status: "authenticated" as const,
    user: { id: user.id, name: user.name, email: user.email },
    lastLoginAt: user.lastLoginAt?.toISOString() ?? null,
    lastClaimedAt: lastClaimedAt?.toISOString() ?? null,
    nextAvailableAt: nextAvailableAt?.toISOString() ?? null,
    cooldownMs: COOLDOWN_MS,
    isReady,
    tokenBalance: user.tokenBalance,
    transactions: transactions.map((t) => ({
      id: t.id,
      amount: t.amount,
      actionType: t.actionType,
      createdAt: t.createdAt.toISOString(),
    })),
  };
}

export async function executeSixHourAction(bypassCooldown: boolean = false) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  const userId = session.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { lastLoginAt: true, tokenBalance: true },
  });

  const lastTx = await prisma.tokenTransaction.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  if (!bypassCooldown) {
    const cooldownStart = lastTx?.createdAt ?? user?.lastLoginAt;
    if (cooldownStart) {
      const nextAvailableAt = new Date(cooldownStart.getTime() + COOLDOWN_MS);
      if (new Date() < nextAvailableAt) {
        return { error: "Cooldown has not expired yet." };
      }
    }
  }

  // Simulate the server-side background action
  const actionType = ACTION_TYPES[Math.floor(Math.random() * ACTION_TYPES.length)];

  const amount = 5;

  const newTx = await prisma.tokenTransaction.create({
    data: {
      userId,
      amount,
      actionType,
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { tokenBalance: { increment: amount } },
  });

  const allTxs = await prisma.tokenTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return {
    success: true,
    newTransaction: {
      id: newTx.id,
      amount: newTx.amount,
      actionType: newTx.actionType,
      createdAt: newTx.createdAt.toISOString(),
    },
    tokenBalance: (user?.tokenBalance ?? 0) + amount,
    transactions: allTxs.map((t) => ({
      id: t.id,
      amount: t.amount,
      actionType: t.actionType,
      createdAt: t.createdAt.toISOString(),
    })),
  };
}
