import Head from 'next/head';
import OrganizationHeader from "../../src/component/organization-header/admin";
import MyCourse from "../../src/section/my-course";

export default function MainPage() {

  return (
    <div>
      <Head>
        <title>
          Main | V-Ground
        </title>
      </Head>
      <OrganizationHeader>
        <MyCourse isAdmin />
      </OrganizationHeader>
    </div>
  )
}