import React from 'react';

import { Row, Col, Flex, Button, Card } from 'antd'

import { PiPaintBrushFill } from "react-icons/pi";
import { GiCoffeePot } from "react-icons/gi";
import { PiPottedPlantFill } from "react-icons/pi";

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
                            icon={<PiPaintBrushFill />}
                        />
                    </Link>
                    <Link to="/plants">
                        <Button
                            style={buttonStyle}
                            icon={<PiPottedPlantFill />}
                        />
                    </Link>
                </Flex>
                <Flex>
                    <Link to="/coffee">
                        <Button
                            style={buttonStyle}
                            icon={<GiCoffeePot />}
                        />
                    </Link>
                    <Button
                        style={buttonStyle}
                        // icon={<CoffeeOutlined height={100} width={100} />}
                    />
                </Flex>
            </Flex>
        </>
    );
}