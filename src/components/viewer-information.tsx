import React from "react";

/*const VIEWER = gql`
  query GetViewer {
    viewer {
      firstName
    }
  }
`;*/

const ViewerInformation = ({ userInfo }) => {
  /*const { loading, error, data } = useQuery(VIEWER);
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div key={data.viewer}>
      <p>Username: {data.viewer?.firstName}</p>
    </div>
  );*/

  return userInfo.userName ? <h6>{userInfo.userName}</h6> : null;
}

export default ViewerInformation;
