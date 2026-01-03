import { NextResponse } from "next/server";
import connectionToDataBase from "@/lib/mongoose";
import Flashcard from "@/models/flashcard";
export async function GET(req:Request) {
    await connectionToDataBase();
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("id");
        const get_six_card = await Flashcard.find({user:userId}, {  content: 1,
          createdAt: 1,
          topic:1,
          flashcardID: 1, _id:0})
        return NextResponse.json({message:get_six_card}, {status:201});
    } catch (error) {
        console.log(error)
    }
    
}