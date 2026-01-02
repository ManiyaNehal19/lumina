import mongoose from "mongoose";
const flashcardItemSchema = new mongoose.Schema({
    front: { type: String, required: true },
    back: { type: String, required: true }
}, { _id: false }); 

const flashcardSchema = new mongoose.Schema({
    flashcardID : {type:String, required:true, unique:true},
    user: { type: String, required: true },
    content: [flashcardItemSchema] 
}, { timestamps: true });
const Flashcard = mongoose.models.Flashcard || mongoose.model("Flashcard", flashcardSchema);
export default Flashcard;