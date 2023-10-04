input.onButtonPressed(Button.A, function () {
    alarm(1)
})
function alarm (repeatTimes: number) {
    for (let index = 0; index < repeatTimes; index++) {
        pins.digitalWritePin(DigitalPin.P0, 1)
        basic.pause(1000)
        pins.digitalWritePin(DigitalPin.P0, 0)
        basic.pause(1000)
    }
}
basic.forever(function () {
    if (input.lightLevel() <= 50) {
        // (32°F − 32) × 5/9 = 0°C
        // 34-32 x 5/9 = 16
        // 64 - 32 x 5/9 = 46
        // 
        if (input.temperature() >= 16 && input.temperature() <= 46) {
            if (input.soundLevel() >= 150) {
                alarm(3)
            }
        }
    }
})
