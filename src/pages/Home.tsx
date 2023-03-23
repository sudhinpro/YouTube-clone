import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Spinner } from '../components/Spinner'
import { clearVideos } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { getHomePageVideo } from '../store/reducers/getHomePageVideo'
import { HomePageVideos } from '../types'

const Home = () => {

    const dispatch = useAppDispatch();
    const videos = useAppSelector((state) => state.youtubeApp.videos);

    useEffect(() => {
        return () => {
            dispatch(clearVideos())
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(getHomePageVideo(false))
    }, [dispatch]);

    return (
        <div className='max-h-screen overflow-hidden '>
            <div style={{ height: "7.5vh" }}>
                <Navbar />
            </div>
            <div className='flex' style={{ height: "92.75vh" }}>
                <Sidebar />
                {videos.length ?
                    (
                        <InfiniteScroll
                            dataLength={videos.length}
                            next={() => dispatch(getHomePageVideo(true))}
                            hasMore={videos.length < 500}
                            loader={<Spinner />}
                            height={650}
                        >
                            <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
                                {videos.map((item: HomePageVideos) => {
                                    return <Card data={item} key={item.videoId} />;
                                })}
                            </div>

                        </InfiniteScroll>
                    ) :
                    (<Spinner />)}

            </div>
        </div>
    )
}

export default Home