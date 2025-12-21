import {Event} from '@/models/Event';
import dbConnect from "@/libs/mongoose";

export async function POST(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const clickedLink = atob(url.searchParams.get('url'));
    const page = url.searchParams.get('page');
    await Event.create({type: 'click', uri: clickedLink, page});
    return Response.json(true);
  } catch (error) {
    console.error(error);
    return Response.json({error: 'An error occurred'}, {status: 500});
  }
}