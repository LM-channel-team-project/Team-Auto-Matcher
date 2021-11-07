import { useEffect, useState } from 'react';
import axios from 'axios';

type GitApiType = {
    [key: string]: any;
};

const addGitRepo = (data: any) => {
  // github API
  const api = axios.create({
    baseURL: `https://api.github.com/repos/LM-channel-team-project/${data?.reponame}`,
    headers: {
      Authorization: process.env.REACT_APP_GIT_APIKEY,
    },
  });

  // const [languages, setLanguages] = useState<GitApiType>({});
  const [home, setHome] = useState<GitApiType>({});
  const [contributor, setContributor] = useState([{}]);
  const [getApi, setGetApi] = useState<boolean>(false);
  const gitApi = {
    homes: () => api.get(''),
    languages: () => api.get('/languages'),
    contributors: () => api.get('/contributors'),
  };

  useEffect(() => {
    const gitInfo = async () => {
      try {
        const { data: homeData } = await gitApi.homes();
        // const { data: langData } = await gitApi.languages();
        const { data: contData } = await gitApi.contributors();
        setHome(homeData);
        // setLanguages(langData);
        setContributor(contData);
        setGetApi(true);
      } catch (e) {
        // console.log(e);
        setGetApi(false);
      }
    };
    gitInfo();
  }, []);

  return {
    options: {
      home,
      contributor,
      getApi,
    },
  };
};

export default addGitRepo;
