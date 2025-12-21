import dbConnect from "@/libs/mongoose";
import { Page } from "@/models/Page";
import { User } from "@/models/User";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const page = await Page.findOne({ uri: params.uri });
    if (!page) {
      return Response.json({ error: 'Page not found' }, { status: 404 });
    }

    const user = await User.findOne({ email: page.owner });
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    return Response.json({ page, user });
  } catch (error) {
    console.error('Error fetching page:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
