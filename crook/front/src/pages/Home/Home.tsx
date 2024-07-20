import { React, useContext } from 'react';

import { Row, Col, Flex, Button, Card, Typography } from 'antd'

import { PiPaintBrushFill } from "react-icons/pi";
import { GiCoffeePot } from "react-icons/gi";
import { PiPottedPlantFill } from "react-icons/pi";

import { Link } from 'react-router-dom'

import { StoreContext } from '../../contexts/StoreContext';

const buttonStyle={
    width:200,
    height:200,
    margin:10,
}

export const HomePage: React.FC = () => {
    const { cmdKOpen, setCmdKOpen } = useContext(StoreContext)

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
                            type="text"
                        />
                    </Link>
                    <Link to="/plants">
                        <Button
                            style={buttonStyle}
                            icon={<PiPottedPlantFill />}
                            type="text"
                        />
                    </Link>
                </Flex>
                <Flex>
                    <Link to="/coffee">
                        <Button
                            style={buttonStyle}
                            icon={<GiCoffeePot />}
                            type="text"
                        />
                    </Link>
                    <Button
                        style={buttonStyle}
                        disabled
                        // icon={<CoffeeOutlined height={100} width={100} />}
                            type="text"
                    >
                        ...
                    </Button>
                </Flex>
                <Flex justify="center" align="bottom">
                    <Typography type="disabled">
                        Or press <Button type="link" size="small" onClick={() => setCmdKOpen(true)}>⌘ + K</Button> to get started
                    </Typography>
                </Flex>
            </Flex>
        </>
    );
}