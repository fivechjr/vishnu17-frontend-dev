import { observable, computed, action } from 'mobx'

class Timer {
    @observable start = Date.now()
    @observable current = Date.now()
    @observable debug = 'DEBUG'

    @computed
    get elapsedTime() {
        console.log('current', this.current)
        console.log('start', this.current)
        return this.current - this.start + ' ms.'
    }

    @action
    tick() {
        console.log('tick!')
        this.current = Date.now()
    }

    @action
    test() {
        console.log('test!')
        this.debug = 'TEST!'
    }
}

export default Timer
