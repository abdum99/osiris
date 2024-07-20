// @ts-nocheck
import { React, useEffect, useState, useCallback } from 'react';
import { Card, Input, Image, Divider, Button, Carousel, Flex, Layout } from 'antd';
import { FormatPainterOutlined, CloseOutlined, PauseOutlined, StepForwardOutlined } from '@ant-design/icons';
import { useList, useApiUrl, useCustom, HttpError } from "@refinedev/core";
import axios from 'axios';

import { API_ORIGIN } from "../../constants";
const API_URL = API_ORIGIN + "/api"

const { Header, Content, Footer, Sider } = Layout;

export const InkyCarousel: React.FC = () => {
    const [ photos, setPhotos ] = useState([]);
    const [ photosReady, setPhotosReady ] = useState(false);
    const [ isUpdating, setIsUpdating ] = useState(false);
    const [ currIndex, setCurrIndex ] = useState(0);
    const [ clickIndex, setClickIndex ] = useState(0);
    const [ displayIndex, setDisplayIndex ] = useState(0);

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

    const handleClick = useCallback( (index) => {
        setClickIndex(index)
    })

    // TODO: handle click anywhere else
    // setClickIndex(undefined)

    const handleMouseEnter = (index) => {
        setDisplayIndex(index)
    }

    const handleMouseLeave = () => {
        setDisplayIndex(clickIndex !== undefined? clickIndex : currIndex)
    }

    const handleUpdate = (newIndex) => {
        setIsUpdating(true);
        axios.get(API_URL + "/inky/next")
            .then( async (res) => {
                await new Promise(r => setTimeout(r, 2000)) // wait 2s to give inky time to update
                console.log(res)
                setCurrIndex(res?.data?.data?.attributes?.current_index)
                setIsUpdating(false);
            })
    }

    useEffect( () => {
        if (isLoading) {
            return
        }
        let workers = data?.data?.photos?.map( async (photo) => {
            let res = await fetch(API_ORIGIN + photo?.preview?.formats?.small?.url);
            return URL.createObjectURL(await res.blob());
        })
        const fetchPhotos = async () => {
            setPhotosReady(false)
            let fetched = await Promise.all(workers)
            setPhotos(fetched)
            setCurrIndex(data?.data?.current_index)
            setPhotosReady(true)
        }
        fetchPhotos()
    }, [data, isLoading])

    if (isLoading) {
        return (
            <Content>
                Loading...
            </Content>
        );
    }

    if (!photosReady) {
        return (
            <Content>
                Loading...
            </Content>
        );
    }

    return (
        <>
        <Flex justify='center' align='center'>
            <Card
                bordered={false}
                description="Inky is picture frame"
                actions={[
                    <Button
                        type="text"
                        danger
                        block
                        icon={<CloseOutlined key="close" />}
                    >
                        Remove
                    </Button>,
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
                        loading={isUpdating}
                        onClick={() => handleUpdate((currIndex + 1) % photos.length)}
                    >
                        Next
                    </Button>,
                ]}>
            <Content>
                <Flex
                    justify="center"
                    align="center"
                    style={{
                        border: "50px solid black",
                        backgroundColor: "white",
                        height: "600px",
                        width: "500px",
                    }}
                >
                <Image 
                    width={500}
                    src={photos[displayIndex]}
                    preview={false}
                    style={{
                        transform: "rotate(90deg)",
                    }}
                />
                </Flex>
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
                    border: index == clickIndex? "3px solid #4096ff": index == currIndex? "1px solid #2076df": "",
                    width: index == displayIndex? "100px" : "90px"
                }}
                src={photo}
                onClick={() => handleClick(index)}
                onMouseEnter={ () => handleMouseEnter(index) }
                onMouseLeave={ () => handleMouseLeave() }
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