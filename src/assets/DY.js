/**
 * DY.js
 * Persistent user data and settings for darryl-yeo.com
 *
 * @copyright 2015-2016 Darryl Yeo
 * @dependencies jQuery, Watch.js, lzstring.js, extend.js
 */

const DY_LOCAL_STORAGE_KEY = 'DY'

const DY = new class {
	constructor(){
		this._data = this.defaultData.merge(localStorage.get(DY_LOCAL_STORAGE_KEY))
	}

	get defaultData(){
		return {
			experiments: {

			},
			settings: {
				/*easterEggGame: {
					on: false,
					notInKansasAnymore: false,
				},*/
			},
			lastSession: {
				date: undefined
			}
		}
	}

	get data(){
		return this._data || this.defaultData
	}

	clearData(){
		delete this._data
		localStorage.removeItem(DY_LOCAL_STORAGE_KEY)
	}
}

window.on('beforeunload', () => {
	DY.data.lastSession.date = Date.now()
	localStorage.set(DY_LOCAL_STORAGE_KEY, DY.data)
})