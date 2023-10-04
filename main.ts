radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        alarm(3)
    } else {
        alarm(0)
    }
})
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
function alarm (repeatTimes: number) {
    for (let index = 0; index < repeatTimes; index++) {
        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.pause(3000)
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.pause(3000)
        music.play(music.stringPlayable("C C5 C C5 C C5 C C5 ", 385), music.PlaybackMode.UntilDone)
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
                radio.sendNumber(1)
            }
        }
    }
})
