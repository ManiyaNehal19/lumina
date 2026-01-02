import mongoose from "mongoose";
import connectionToDataBase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Flashcard from "@/models/flashcard";
export async function POST(req:Request){
    await connectionToDataBase();
    try {
        const {content, userId} = await req.json();
        console.log(content, userId);
        const flashcardID = `${userId.id}+${Date.now()}`
        const user = userId.id;
        const append = await Flashcard.create({flashcardID, user, content} );
        return NextResponse.json({id_flash:flashcardID}, {status:201});

    } catch (error) {
        console.log(error);
    }
}