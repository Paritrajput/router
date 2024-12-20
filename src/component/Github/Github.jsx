import React, { useEffect, useState } from "react";

function Github() {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch("https://api.github.com/users/paritrajput")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <div className=" flex bg-gray-600 text-white text-3xl gap-48 p-4 h-48">
      <img src={data.avatar_url} />
      GitHub Followers: {data.followers}
    </div>
  );
}

export default Github;
