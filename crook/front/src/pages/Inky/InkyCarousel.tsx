// @ts-nocheck
import { React, useEffect, useState, useCallback } from 'react';
import { Card, Input, Image, Divider, Button, Carousel, Flex, Layout } from 'antd';
import { FormatPainterOutlined, CloseOutlined, PauseOutlined, StepForwardOutlined } from '@ant-design/icons';
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
    const [ previewIndex, setPreviewIndex ] = useState(currIndex);

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

    const handlePreview = useCallback( (previewIndex) => {
        setPreviewIndex(previewIndex)
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
        <Flex justify='center' align='center'>
            <Card
                title="Inky"
                bordered={false}
                description="Inky is picture frame"
                actions={[
                    <CloseOutlined key="close" />,
                    <Button
                        type="text"
                        block
                        disabled={true}
                        icon={<PauseOutlined key="pause" />}
                    >
                        Pause
                    </Button>,
                    <Button
                        type="text"
                        block
                        icon={<StepForwardOutlined key="forward" />}
                        disabled={isUpdating}
                        onClick={() => {
                            setIsLoading(true);
                            axios.get(API_URL + "/inky/next")
                            .then( async res => {
                                setCurrIndex(res?.data?.attributes?.current_index)
                                await new Promise(r => setTimeout(r, 1000))
                                setIsLoading(false);
                            })
                        }}>
                        Next
                    </Button>,
                ]}>
            <Content>
                <Image 
                    width={500}
                    src={photos[currIndex]}
                    preview={false}
                    style={{
                        transform: "rotate(90deg)",
                        marginTop: "80px",
                        marginBottom: "80px",
                    }}
                />
            </Content>
            </Card>
        </Flex>
        <Divider />
        <Flex justify='center' align='center'>
        {
        photos.map((photo, index) =>
            <Input
                type="image"
                key={"thumbnail" + index.toString()}
                style={{
                    marginBottom: "30px",
                    transform: "rotate(90deg)",
                    border: index == previewIndex? "3px solid #4096ff": "",
                    width: "100px"
                }}
                src={photo}
                onClick={() => handlePreview(index)}
            />
        )}
        </Flex>
        <Flex justify="center">
            <Button
                type="primary"
                icon={
                    <FormatPainterOutlined />
                }
                style={{
                    margin: "2px"
                }}
            >
                Paint It!
            </Button>
        </Flex>
        </>
    );
};