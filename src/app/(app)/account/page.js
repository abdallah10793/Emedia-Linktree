import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import UsernameForm from "@/components/forms/UsernameForm";
import QRCodeButton from "@/components/QRCodeButton";
import {Page} from "@/models/Page";
import dbConnect from "@/libs/mongoose";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

export const metadata = {
  title: 'Emedia Linktree | Account',
  description: 'Share your links, social profiles, contact info and more on one page',
}

export default async function AccountPage({searchParams}) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;

  if (!session) {
    return redirect('/');
  }

  try {
    await dbConnect();
    const page = await Page.findOne({owner: session?.user?.email}).lean();

    // Check if the page exists before trying to clone it
    if (page) {
      page._id = page._id.toString();

      return (
        <>
          <PageSettingsForm page={page} user={session.user} />
          <PageButtonsForm page={page} user={session.user} />
          <PageLinksForm page={page} user={session.user} />
          <div className="mt-8">
            <QRCodeButton pageUri={page.uri} />
          </div>
        </>
      );
    }

    // Return the UsernameForm if no page is found
    return (
      <div>
        <UsernameForm desiredUsername={desiredUsername} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div>
        <h1>Error</h1>
        <p>An error occurred while fetching your account data. Please try again later.</p>
      </div>
    );
  }
}



