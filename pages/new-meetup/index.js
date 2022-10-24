import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";
import { Fragment } from "react";

function NewMeetupPage() {
  const router=useRouter();

  async function addMeetUpHandler(enteredMeetUpData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetUpData),
      headers:{
        'Content-Type':'application/json'
      }
    });

    const data=await response.json();
    console.log(data);

    router.push('/')
  }
  return <Fragment>
     <Head>
        <title>Add New Meetup</title>
        <meta
          name="description"
          content="Add your new meetup"
        />
      </Head>
  <NewMeetupForm onAddMeetUp={addMeetUpHandler} />
  </Fragment>;
}

export default NewMeetupPage;
