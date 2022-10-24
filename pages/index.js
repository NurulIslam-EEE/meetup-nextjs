import Head from "next/head";

import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

const dummyMeetup = [
  {
    id: "m1",
    title: " a first meetup",
    image:
      "https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/james_madison_university.jpg?itok=UWipA6r9",
    address: "",
    description: "",
  },
  {
    id: "m2",
    title: " a first meetup",
    image:
      "https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/james_madison_university.jpg?itok=UWipA6r9",
    address: "",
    description: "",
  },
  {
    id: "m3",
    title: " a first meetup",
    image:
      "https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/james_madison_university.jpg?itok=UWipA6r9",
    address: "",
    description: "",
  },
];

function HomePage(props) {
  // const [loadMeetup, setLoadingMeetUp] = useState([]);
  // useEffect(() => {
  //   setLoadingMeetUp(dummyMeetup);
  // }, []);
  return (
    <Fragment>
      <Head>
        <title>React Meetup</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react meet up"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// export async function getServerSideProps(context){

//   const req=context.req;
//   const res=context.res;
//   return{
//     props:{
//       meetups:dummyMeetup
//     }
//   }
// }
export async function getStaticProps() {
  //fetch data from API

  const client = await MongoClient.connect(
    "mongodb+srv://tour-management:D6BQSUTbYfjv0lJu@cluster0.sjm7yvz.mongodb.net/meetup?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}).toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
