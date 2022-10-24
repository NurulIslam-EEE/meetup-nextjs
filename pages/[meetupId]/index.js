import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

import { MongoClient ,ObjectId} from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetUpDetails(props) {
  return (
    <Fragment>
         <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description}
        />
      </Head>
    <MeetupDetail
      // image="https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/james_madison_university.jpg?itok=UWipA6r9"
      // title="First meetup"
      // address="some street 5, some city"
      // description="this is first meetup"
       image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
      
    />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://tour-management:D6BQSUTbYfjv0lJu@cluster0.sjm7yvz.mongodb.net/meetup?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups =await meetupsCollection.find({},{_id:1}).toArray();
  client.close();
  return {
    fallback: 'blocking',
    paths: meetups.map(meetup=>({params:{meetupId:meetup._id.toString()}}))

    // [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ]
  };
}

export async function getStaticProps(context) {
  // fetch data  from a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://tour-management:D6BQSUTbYfjv0lJu@cluster0.sjm7yvz.mongodb.net/meetup?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const singleMeetup =await meetupsCollection.findOne({_id:ObjectId(meetupId)});
  client.close()

  return {
    props: {
      meetupData: {
       id: singleMeetup._id.toString(),
       title:singleMeetup.title,
       address:singleMeetup.address,
       image:singleMeetup.image,
       description:singleMeetup.description
      }
      // {
      //   image: "",
      //   id: "m1",
      //   title: "first meetup",
      //   description: " this id first meetup",
      // },
    },
  };
}

export default MeetUpDetails;
