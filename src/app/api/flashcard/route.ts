import mongoose from "mongoose";
import connectionToDataBase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Flashcard from "@/models/flashcard";
export async function POST(req:Request){
    await connectionToDataBase();
    try {
        const {topic,content, userId} = await req.json();
        console.log(content, userId);
        const flashcardID = `${userId.id}_${Date.now()}`
        const user = userId.id;
        const append = await Flashcard.create({topic,flashcardID, user, content} );
        return NextResponse.json({id_flash:flashcardID}, {status:201});

    } catch (error) {
        console.log(error);
    }
}
export async function GET(request:Request){
    await connectionToDataBase();
    try{
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        console.log(id);
        const findFlash = await Flashcard.findOne({flashcardID: id}, {content:1, _id:0});
        return NextResponse.json({content: findFlash}, {status:201});
    }catch(error){
        console.log(error);
    }
}