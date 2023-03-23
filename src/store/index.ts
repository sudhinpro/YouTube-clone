import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "../types";
import { getHomePageVideo } from "./reducers/getHomePageVideo";
import { getRecommendedVideos } from "./reducers/getRecommendedVideo";
import { getSearchPageVideo } from "./reducers/getSearchPageVideo";
import { getVideoDetails } from "./reducers/getVideDetails";

const initialState: InitialState = {
    videos: [],
    currentPlaying: null,
    searchTerm: "",
    searchTResult: [],
    nextPageToken: null,
    recommendedVideos: []
}

const YoutubeSlice = createSlice({
    name: "yotubeApp",
    initialState,
    reducers: {
        clearVideos: (state) => {
            state.videos = [];
            state.nextPageToken = null;
        },
        changeSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        clearSearchTerm: (state) => { state.searchTerm = '' }
    },
    extraReducers: (builder => {
        builder.addCase(getHomePageVideo.fulfilled, (state, action) => {
            state.videos = action.payload.parsedData;
            state.nextPageToken = action.payload.nextPageToken
        });

        builder.addCase(getSearchPageVideo.fulfilled, (state, action) => {
            state.videos = action.payload.parsedData;
            state.nextPageToken = action.payload.nextPageToken
        });

        builder.addCase(getVideoDetails.fulfilled, (state, action) => {
            state.currentPlaying = action.payload;
        });

        builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
            state.recommendedVideos = action.payload.parsedData;
        });
    })
})

export const store = configureStore({
    reducer: { youtubeApp: YoutubeSlice.reducer }
})

export const { clearVideos, changeSearchTerm, clearSearchTerm } = YoutubeSlice.actions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;