import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchCard from '../components/SearchCard'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Spinner } from '../components/Spinner'
import { clearVideos } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { getSearchPageVideo } from '../store/reducers/getSearchPageVideo'
import { HomePageVideos } from '../types'

const Search = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const videos = useAppSelector((state) => state.youtubeApp.videos);
    const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

    useEffect(() => {
        dispatch(clearVideos())
        if (searchTerm === '') navigate('/')
        else dispatch(getSearchPageVideo(false))

    }, [dispatch, navigate, searchTerm]);

    return (
        <div className='max-h-screen overflow-hidden '>
            <div style={{ height: "7.5vh" }}>
                <Navbar />
            </div>
            <div className='flex' style={{ height: "92.75vh" }}>
                <Sidebar />
                {videos.length ?
                    (
                        <div className='py-8 pl-8 flex-col gap-5 w-full'>
                            <InfiniteScroll
                                dataLength={videos.length}
                                next={() => dispatch(getSearchPageVideo(true))}
                                hasMore={videos.length < 500}
                                loader={<Spinner />}
                                height={600}
                            >

                                {videos.map((item: HomePageVideos) => {
                                    return (<div className="my-5">
                                        <SearchCard data={item} key={item.videoId} />
                                    </div>)
                                })}


                            </InfiniteScroll>

                        </div>
                    ) :
                    (<Spinner />)}

            </div>
        </div >
    )
}

export default Search