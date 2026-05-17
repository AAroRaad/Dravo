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

function generateToken(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segment = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `DRAVO-${segment()}-${segment()}-${segment()}`;
}

export async function getClaimStatus() {
  const session = await auth();
  if (!session?.user?.id) {
    return { status: "unauthenticated" as const };
  }

  const userId = session.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, lastLoginAt: true },
  });

  if (!user) return { status: "unauthenticated" as const };

  const tokens = await prisma.generatedToken.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const lastClaimedAt = tokens.length > 0 ? tokens[0].createdAt : null;
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
    tokens: tokens.map((t) => ({
      id: t.id,
      token: t.token,
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
    select: { lastLoginAt: true },
  });

  const lastToken = await prisma.generatedToken.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  if (!bypassCooldown) {
    const cooldownStart = lastToken?.createdAt ?? user?.lastLoginAt;
    if (cooldownStart) {
      const nextAvailableAt = new Date(cooldownStart.getTime() + COOLDOWN_MS);
      if (new Date() < nextAvailableAt) {
        return { error: "Cooldown has not expired yet." };
      }
    }
  }

  // Simulate the server-side background action
  const actionType = ACTION_TYPES[Math.floor(Math.random() * ACTION_TYPES.length)];

  // Generate and persist 10 new tokens
  const newTokensData = Array.from({ length: 10 }).map(() => ({
    userId,
    token: generateToken(),
    actionType,
  }));
  
  await prisma.generatedToken.createMany({
    data: newTokensData,
  });

  // Fetch full updated list for the client
  const allTokens = await prisma.generatedToken.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  // Get the 10 newly created tokens to return them specifically
  const createdTokens = allTokens.slice(0, 10).map(t => ({
    id: t.id,
    token: t.token,
    actionType: t.actionType,
    createdAt: t.createdAt.toISOString(),
  }));

  return {
    success: true,
    newTokens: createdTokens,
    tokens: allTokens.map((t) => ({
      id: t.id,
      token: t.token,
      actionType: t.actionType,
      createdAt: t.createdAt.toISOString(),
    })),
  };
}
