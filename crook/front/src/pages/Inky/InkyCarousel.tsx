// @ts-nocheck
import { React, useEffect, useState } from 'react';
import { Card, Image, Divider, Button, Carousel, Flex, Layout } from 'antd';
import { useList, HttpError } from "@refinedev/core";
import axios from 'axios';

import { API_ORIGIN } from "../../constants";
const API_URL = API_ORIGIN + "/api"

const { Header, Content, Footer, Sider } = Layout;

export const InkyCarousel: React.FC = () => {
    const [isUpdating, setIsLoading] = useState(false);
    const [currIndex, setCurrIndex] = useState(0);

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

    if (isLoading) {
    return (
        <Card>
        Loading...
        </Card>
    );
    }

    console.log("should be loaded now")
    console.log("inky:", data)

    return (
        <>
        <Layout>
            <Flex justify='center' align='center'>
                <Content>
                {isLoading?
                <h1>Loading...</h1>
                :
                <>
                <Flex justify='center' align='center'>
                    <Image 
                        width={300}
                        src={API_ORIGIN + data?.data?.photos?.[currIndex]?.preview?.formats?.small?.url}
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
                            key={"thumbnail" + photo?.id.toString()}
                            width={50}
                            src={API_ORIGIN + photo?.preview?.formats?.small?.url}
                            preview={false}
                        />
                    )}
                </Flex>
                </>
                }
                </Content>
            </Flex>
            <Divider />
        </Layout>
        </>
    );
};

            // <Button type="primary" disabled={isUpdating} onClick={() => {
            // setIsLoading(true);
            // axios.get(API_URL + "/inky/next")
            // .then( async res => {
            //     setCurrIndex(res?.data?.attributes?.current_index)
            //     await new Promise(r => setTimeout(r, 1000))
            //     setIsLoading(false);
            // })
            // }}>
            //     Next Picture
            // </Button>