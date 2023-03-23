import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { HomePageVideos } from "../../types";
import { parseData } from "../../utils";
import { YOUTUBE_DATA_API_URL, YOUTUBE_API_KEY } from "../../utils/constants";

export const getHomePageVideo = createAsyncThunk("youtubeApp/homePageVideos",
    async (isNext: boolean, { getState }) => {
        const { youtubeApp: { nextPageToken: nextPageTokenFromState, videos } } = getState() as RootState;
        const { data: { items, nextPageToken } } = await axios.get(`${YOUTUBE_DATA_API_URL}/search?maxResults=20&q="reactjs projects"&key=${YOUTUBE_API_KEY}&part=snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""}`)
        const parsedData: HomePageVideos[] = await parseData(items)
        return { parsedData: [...videos, ...parsedData], nextPageToken }
    });
