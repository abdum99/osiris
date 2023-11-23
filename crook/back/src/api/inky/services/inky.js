'use strict';

/**
 * inky service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const mqtt = require('mqtt');
const fs = require('fs')

const IMG_FILE_PREFIX = "public"
const MQTT_BROKER_HOST = "abdu.live:1883"
const MQTT_TOPIC = "/inky/bmp"

const client = mqtt.connect('mqtt://' + MQTT_BROKER_HOST)
// TODO: Do I need to add mutex here? Since node runs single-threaded, I don't think
// so. Right..?
let connected = false;

client.on("connect", () => {
    connected = true;
});

module.exports = createCoreService('api::inky.inky', ({ strapi }) => ({
    async updateInky(pic) {
        strapi.log.info("Uploading pic to Inky");
        strapi.log.info(JSON.stringify(pic));

        let retries = 0;
        while (!connected && retries < 5) {
            strapi.log.error("MQTT Client is not connected");
            strapi.log.info("Reconnecting...");
            client.connect();
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        if (!connected) {
            strapi.log.error("Could not connect to MQTT Broker. Returning");
        }

        fs.readFile(IMG_FILE_PREFIX + pic.url, (err, data) => {
            if (err) {
                strapi.log.error(err);
                return;
            }

            client.publish(MQTT_TOPIC, data, {
                qos: 2,
            })
            strapi.log.info("published image!")
        })
    }
}));
