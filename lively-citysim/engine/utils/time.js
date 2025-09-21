
class Time {
    static async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export { Time }