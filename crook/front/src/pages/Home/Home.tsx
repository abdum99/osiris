import React from 'react';

import { Row, Col, Flex, Button, Card } from 'antd'
import { BgColorsOutlined, CoffeeOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'

const buttonStyle={
    width:200,
    height:200,
    margin:10,
}

export const HomePage: React.FC = () => {
    return (
        <>
            <Flex
                justify="center"
                align="center"
                style={{
                    height:"100%",
                    top:0,
                    bottom:0,
                    flex:1,
                }}
                vertical
            >
                <Flex>
                    <Link to="/inky">
                    <Button
                        style={buttonStyle}
                        icon={<BgColorsOutlined height={100} width={100} />}
                    />
                    </Link>
                    <Link to="/coffee">
                    <Button
                        style={buttonStyle}
                        icon={<CoffeeOutlined height={100} width={100} />}
                    />
                    </Link>
                </Flex>
                <Flex>
                    <Button
                        style={buttonStyle}
                        // icon={<CoffeeOutlined height={100} width={100} />}
                    />
                    <Button
                        style={buttonStyle}
                        // icon={<CoffeeOutlined height={100} width={100} />}
                    />
                </Flex>
            </Flex>
        </>
    );
}