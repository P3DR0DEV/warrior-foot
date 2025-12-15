"use server";

import { HTTPError } from "ky";
import { warriorfootApi } from "../api-client";

interface Player {
  id: string,
  name: string,
  position: 'goalkeeper' | 'outfield',
  isStar: boolean,
  strength: number,
  agility: number,
  energy: number,
  kick: number,
  longKick: number,
  pass: number,
  longPass: number,
  dribble: number | null,
  jump: number | null,
  reflexes: number | null,
  value: number,
  stamina: number
}

interface GetTeamByIdResponse {
  id: string;
  name: string;
  leagueId: string;
  division: 'A' | 'B' | 'C' | 'D';
  primaryColor: string;
  secondaryColor: string;
  players: Player[];
}

type GetTeamByIdResult =
  | {
      success: true;
      data: { team: GetTeamByIdResponse };
    }
  | {
      success: false;
      message: string;
      validationErrors: null;
    };

export async function getTeamById(teamId: string): Promise<GetTeamByIdResult> {
  try {
    const response = await warriorfootApi.get(`teams/${teamId}`).json<{ team: GetTeamByIdResponse }>();

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    if (error instanceof HTTPError) {
      const apiError = await error.response.json<{ message: string }>();

      const message = apiError.message;

      return { success: false, message, validationErrors: null };
    }

    return {
      success: false,
      message: "Unexpected error, try again in a few minutes.",
      validationErrors: null,
    };
  }
}
