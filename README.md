# Bolt-IoT-Wrapper
## Simple Bolt IoT Api wrapper

[![Build Status](https://travis-ci.org/pranaydutta89/bolt-iot-wrapper.svg?branch=master)](https://travis-ci.org/pranaydutta89/bolt-iot-wrapper)

###Usage:-

#####Nodejs:

 ```
 npm i bolt-iot-wrapper
 ```

 ```javascript
 // import module
 import {Devices,Enums} from 'bolt-iot-wrapper';

 ```

#####Browser

```html
<!-- CDN script tag-->
<script src="https://unpkg.com/bolt-iot-wrapper/umd/boltIotWrapper.min.js"></script>
```

#####API

```javascript
  // 1) Register devices
  Devices.add({deviceName},{deviceKey});

  // 2) Read Device
  const instance =Devices.read({deviceName},{deviceKey});

  // A) Analog
  instance.Analog.read()// reads analog pin data return a promise

  instance.Analog.loopRead({milliseconds},{callback}) // reads analog pin continously in paritcular interval

  //B) Digital
  instance.Digital.read({pin |pins[]}) // read Digital signals of single of multiple pins returns a promise

  instance.Digital.write({IDigitalparams | IDigitlparams[]}) // write digital singals 

  instance.Digital.loopRead({pin | pins[]},{milleseconds},{callback}) // read digital singals in particular interval

  //C) UART
  instance.UART.begin({baudRate}) //sets the baud rate

  instance.UART.read({till})

  instance.UART.write({data})

  instance.UART.readWrite({data},{till})
  
  //D) utils

  instance.Utility.isOnline()// returns a promise with resolved valueas true/false

  instance.Utility.restart()

  instance.Utility.version()

```

```javascript
 //same api follows for browser just its int window object as 

 boltApi.Devices.add({deviceName},{deviceKey})
```
#####Module is built over typescript so you will get all the necessary intellisense ,for detailed information visit below url


https://pranaydutta89.github.io/bolt-iot-wrapper/
