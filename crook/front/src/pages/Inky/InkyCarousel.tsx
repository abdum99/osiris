// @ts-nocheck
import { React, useEffect, useState } from 'react';
import { Card, Image, Divider, Button, Carousel, Flex, Layout } from 'antd';
import { useList, HttpError } from "@refinedev/core";
import axios from 'axios';

import { API_ORIGIN } from "../../constants";
const API_URL = API_ORIGIN + "/api"

const { Header, Content, Footer, Sider } = Layout;

export const InkyCarousel: React.FC = () => {
    const [ photos, setPhotos ] = useState([]);
    const [ photosReady, setPhotosReady ] = useState(false);
    const [ isUpdating, setIsLoading ] = useState(false);
    const [ currIndex, setCurrIndex ] = useState(0);

    const { data, isLoading, isError } = useList({
    resource: "inky",
    meta: {
        populate: {
            photos: {
                populate: {
                    preview: {
                        fields: "formats"
                    }
                }
            }
        }
    }
    })

    useEffect( () => {
        let workers = data?.data?.photos?.map( async (photo) => {
            let res = await fetch(API_ORIGIN + photo?.preview?.formats?.small?.url);
            return URL.createObjectURL(await res.blob());
        })
        const fetchPhotos = async () => {
            setPhotosReady(false)
            let fetched = await Promise.all(workers)
            console.log("fetched:", fetched)
            setPhotos(fetched)
            setPhotosReady(true)
        }
        fetchPhotos()
    }, [isLoading])

    if (!photosReady) {
        return (
            <Content>
                Loading...
            </Content>
        );
    }

    console.log("photos:", photos)
    return (
        <>
        <Layout>
            <Flex justify='center' align='center'>
                <Content>
                <Flex justify='center' align='center'>
                    <Image 
                        width={300}
                        src={photos[currIndex]}
                        preview={false}
                        style={{
                            padding: 20
                        }}
                    />
                </Flex>
                {/* <Divider /> */}
                <Flex justify='center' align='center'>
                {
                photos.map((photo, index) =>
                    <Image 
                        key={"thumbnail" + index.toString()}
                        width={100}
                        src={photo}
                        preview={false}
                        style={{
                            "padding": 5,
                            "border": index == currIndex? "solid blue": ""
                        }}
                    />
                )}
                </Flex>
                </Content>
            </Flex>
            <Divider />
            <Button type="primary" disabled={isUpdating} onClick={() => {
            setIsLoading(true);
            axios.get(API_URL + "/inky/next")
            .then( async res => {
                setCurrIndex(res?.data?.attributes?.current_index)
                await new Promise(r => setTimeout(r, 1000))
                setIsLoading(false);
            })
            }}>
                Next Picture
            </Button>
        </Layout>
        </>
    );
};
