input.onButtonPressed(Button.A, function () {
    OnGame = 1
    score = 0
    strip.clear()
    strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
    strip.setPixelColor(Math.floor(highestScore / 2), neopixel.colors(NeoPixelColors.Red))
    strip.show()
})
let pressed = 0
let StartTime = 0
let highestScore = 0
let score = 0
let strip: neopixel.Strip = null
let OnGame = 0
OnGame = 1
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
strip = neopixel.create(DigitalPin.P0, 30, NeoPixelMode.RGB)
strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
strip.show()
basic.forever(function () {
    if (OnGame == 1) {
        strip.setPixelColor(Math.floor(highestScore / 2), neopixel.colors(NeoPixelColors.Red))
        strip.show()
        basic.showNumber(4)
        basic.showNumber(3)
        basic.showNumber(2)
        basic.showNumber(1)
        basic.clearScreen()
        StartTime = control.millis()
        while (control.millis() - StartTime < 5000) {
            if (pins.digitalReadPin(DigitalPin.P2) == 0) {
                if (pressed == 0) {
                    score += 1
                    pressed = 1
                    strip.setPixelColor(Math.floor(score / 2), neopixel.colors(NeoPixelColors.Green))
                    strip.show()
                }
                led.plot(0, 0)
            } else {
                pressed = 0
                led.unplot(0, 0)
            }
        }
        OnGame = 0
    } else {
        if (score > highestScore) {
            highestScore = score
        }
        strip.setPixelColor(Math.floor(score / 2), neopixel.colors(NeoPixelColors.Green))
        strip.setPixelColor(Math.floor(highestScore / 2), neopixel.colors(NeoPixelColors.Red))
        strip.show()
        basic.showNumber(score)
    }
})
