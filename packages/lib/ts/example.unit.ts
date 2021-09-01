import { expect } from 'chai'

describe('Example unit test', () => {

    it('succeed', async () => {
        const title = 'Thundering herds, noisy neighbours, and retry storms'
        const items = [{ title: title }]

        expect(items.length).to.be.greaterThan(0)
        expect(items.map(i => i.title)).to.contain(title)
    });

})
