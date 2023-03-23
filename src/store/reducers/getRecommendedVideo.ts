import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { RecommendedVideos } from "../../types";
import { parseRecommendedData } from "../../utils";
import { YOUTUBE_DATA_API_URL, YOUTUBE_API_KEY } from "../../utils/constants";

export const getRecommendedVideos = createAsyncThunk(
    "yotubeApp/getRecommendedVideos",
    async (videoId: string, { getState }) => {
        const {
            youtubeApp: {
                currentPlaying: {
                    channelInfo: { id: channelId },
                },
            },
        } = getState() as RootState;

        const {
            data: { items },
        } = await axios.get(
            `${YOUTUBE_DATA_API_URL}/activities?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`
        );

        const parsedData: RecommendedVideos[] = await parseRecommendedData(
            items,
            videoId
        );

        return { parsedData };
    }
);