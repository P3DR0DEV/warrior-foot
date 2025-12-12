CREATE TYPE "public"."position" AS ENUM('goalkeeper', 'outfield');--> statement-breakpoint
CREATE TABLE "players" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"team_id" uuid NOT NULL,
	"position" "position" NOT NULL,
	"is_star" boolean NOT NULL,
	"strength" integer NOT NULL,
	"agility" integer NOT NULL,
	"energy" integer NOT NULL,
	"kick" integer NOT NULL,
	"long_kick" integer NOT NULL,
	"pass" integer NOT NULL,
	"long_pass" integer NOT NULL,
	"dribble" integer,
	"jump" integer,
	"reflexes" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "players" ADD CONSTRAINT "players_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;