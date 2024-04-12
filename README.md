# osiris
[WIP] Home Server to control a bunch of IoT projects

## Installation
Osiris uses MQTT to communicate. Make sure to install an mqtt broker and run it on port 1883
Eclipse's mosquitto is a great open source one
### MQTT Broker
Install the mosquitto binaries
```
sudo apt-get install mosquitto mosquitto-clients
```
Best way to start the MQTT Broker is probably to run it as systemd service
See [mosquitto.service.notify](https://github.com/eclipse/mosquitto/blob/master/service/systemd/mosquitto.service.notify)
Here's a simple script to download the .service file and run the service
```
# Save file as `mosquitto.service` in `/lib/systemd/system`
$ sudo curl https://raw.githubusercontent.com/eclipse/mosquitto/master/service/systemd/mosquitto.service.notify -o /lib/systemd/system/mosquitto.service
$ sudo systemctl daemon-reload
$ sudo systemctl start mosquitto.service
```

Then verify the broker is active with `systemctl status mosquitto.service`

> TODO:
> after adding an actual useful mosquitto.conf (with authentication e.g.), copy it to /etc/mosquitto/conf.d/ so it's applied to the broker config
