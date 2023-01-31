function move_backward (speed: number) {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, speed, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, speed, 67)
}
function move_stop () {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, 0, 67)
}
function obstacle_test () {
    if (LL == 1 && RR == 1) {
        basic.showLeds(`
            . . # . .
            . # . # .
            # . # . #
            . . # . .
            . . # . .
            `)
        path_tracking_drive_follow()
    } else if (LL == 0 && RR == 1) {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        move_backward(100)
        move_left_turn(50)
    } else if (LL == 1 && RR == 0) {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        move_backward(100)
        move_right_turn(50)
    } else {
        basic.showIcon(IconNames.Target)
        move_stop()
    }
}
input.onButtonPressed(Button.A, function () {
    followOn = false
})
function light_strip_test () {
    strip.showColor(neopixel.colors(NeoPixelColors.Red))
    basic.pause(500)
    strip.showColor(neopixel.colors(NeoPixelColors.Orange))
    basic.pause(500)
    strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
    basic.pause(500)
    strip.showColor(neopixel.colors(NeoPixelColors.Green))
    basic.pause(500)
    strip.showColor(neopixel.colors(NeoPixelColors.Blue))
    basic.pause(500)
    strip.showColor(neopixel.colors(NeoPixelColors.Indigo))
    basic.pause(500)
    strip.showColor(neopixel.colors(NeoPixelColors.Violet))
    basic.pause(500)
    strip.showColor(neopixel.colors(NeoPixelColors.Purple))
    basic.pause(500)
    strip.showColor(neopixel.colors(NeoPixelColors.White))
    basic.pause(500)
}
function path_tracking_drive_follow () {
    strip.showRainbow(1, 360)
    s1 = pins.digitalReadPin(DigitalPin.P13)
    s2 = pins.digitalReadPin(DigitalPin.P12)
    LL = pins.digitalReadPin(DigitalPin.P2)
    RR = pins.digitalReadPin(DigitalPin.P11)
    if (LL == 1 && RR == 1) {
        move_stop()
    } else if (LL == 0 && RR == 1) {
        move_left_turn(50)
    } else if (LL == 1 && RR == 0) {
        move_right_turn(50)
    } else {
        if (s1 == 1 && s2 == 0) {
            move_right_turn(55)
        } else {
            if (s1 == 0 && s2 == 1) {
                move_left_turn(55)
            } else if (s1 == 0 && s2 == 0) {
                move_stop()
            } else {
                move_forward(40)
            }
        }
    }
    basic.pause(100)
}
input.onButtonPressed(Button.B, function () {
    followOn = true
})
function light_front_test () {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, 0, 67)
    basic.pause(1000)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, 100, 67)
    basic.pause(1000)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, 100, 67)
    basic.pause(1000)
}
function obstacle_detection () {
    RR = pins.digitalReadPin(DigitalPin.P12)
    LL = pins.digitalReadPin(DigitalPin.P13)
    if (LL == 1 && RR == 0) {
        basic.showLeds(`
            # . . . .
            # . . . .
            # . . . .
            # . . . .
            # . . . .
            `)
    } else if (LL == 0 && RR == 1) {
        basic.showLeds(`
            . . . . #
            . . . . #
            . . . . #
            . . . . #
            . . . . #
            `)
    } else if (LL == 1 && RR == 1) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
    } else {
        basic.showLeds(`
            # # # # #
            # . # . #
            # # . # #
            # . # . #
            # # # # #
            `)
    }
}
function path_tracking_drive () {
    strip.showRainbow(1, 360)
    s1 = pins.digitalReadPin(DigitalPin.P13)
    s2 = pins.digitalReadPin(DigitalPin.P12)
    if (s1 == 1 && s2 == 0) {
        move_right_turn(55)
    } else {
        if (s1 == 0 && s2 == 1) {
            move_left_turn(55)
        } else if (s1 == 0 && s2 == 0) {
            move_stop()
        } else {
            move_forward(40)
        }
    }
}
function move_left_turn (speed: number) {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, speed / 2, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, speed, 67)
}
function move_forward (speed: number) {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, speed, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, speed, 67)
}
function move_right_turn (speed: number) {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, speed, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, speed / 2, 67)
}
function light_level_sensing () {
    light_level = input.lightLevel()
    strip.showColor(neopixel.rgb(255 - input.lightLevel(), 255 - input.lightLevel(), 255 - input.lightLevel()))
    basic.pause(100)
}
let light_level = 0
let followOn = false
let strip: neopixel.Strip = null
let s2 = 0
let s1 = 0
let LL = 0
let RR = 0
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
pins.setPull(DigitalPin.P11, PinPullMode.PullUp)
RR = 0
LL = 0
s1 = 0
s2 = 0
PCA9685.init(67, 0)
led.enable(false)
strip = neopixel.create(DigitalPin.P5, 18, NeoPixelMode.RGB)
strip.clear()
PCA9685.reset(67)
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, 100, 67)
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, 100, 67)
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, 100, 67)
followOn = false
basic.forever(function () {
    LL = pins.digitalReadPin(DigitalPin.P2)
    RR = pins.digitalReadPin(DigitalPin.P11)
    if (LL == 1 && RR == 1) {
        path_tracking_drive()
    } else if (LL == 0 && RR == 1) {
        move_backward(100)
        move_right_turn(50)
    } else if (LL == 1 && RR == 0) {
        move_backward(100)
        move_left_turn(50)
    } else {
        move_stop()
    }
    basic.pause(100)
})
