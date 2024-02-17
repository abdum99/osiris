// @ts-nocheck
import { React, useEffect, useState } from 'react';
import { Image, Divider, Button, Carousel, Flex, Layout } from 'antd';
import { useList, HttpError } from "@refinedev/core";
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;

const API_URL = "http://10.0.0.14:1337";

export const InkyCarousel: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currIndex, setCurrIndex] = useState(0);
    const { data, isLoadinggg, isErrorgg } = useList({
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
    useEffect(() => {
        console.log("Called useEffect()");
        setCurrIndex(data?.data?.current_index);
    })

    return (
        <>
        <Layout>
            <Flex justify='center' align='center'>
                <Content>
                {isLoadinggg?
                <h1>Loading...</h1>
                :
                <>
                <Flex justify='center' align='center'>
                    <Image 
                        width={300}
                        src={API_URL + data?.data?.photos?.[currIndex]?.preview?.formats?.small?.url}
                        preview={false}
                        style={{
                            padding: 20
                        }}
                    />
                </Flex>
                {/* <Divider /> */}
                <Flex justify='center' align='center'>
                {
                    data?.data?.photos?.map((photo) =>
                        <Image 
                            width={50}
                            src={API_URL + photo?.preview?.formats?.small?.url}
                            preview={false}
                        />
                    )}
                </Flex>
                </>
                }
                </Content>
            </Flex>
            <Divider />
            <Button type="primary" disabled={isLoading} onClick={() => {
            setIsLoading(true);
            axios.get("http://10.0.0.14:1337/api/inky/next")
            .then( async res => {
                setCurrIndex(res?.data?.data?.attributes?.current_index)
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