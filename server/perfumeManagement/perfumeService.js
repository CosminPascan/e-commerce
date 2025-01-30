const db = require('../database/dbConfig')
// const perfumes = require('..//scraped_data/perfumes.json')
const perfumes = []

const getAllPerfumes = async (req, res) => {
    try {
        const perfumesRef = db.collection('perfumes')
        const querySnapshot = await perfumesRef.get()
        const perfumes = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        res.status(200).json(perfumes)
    } catch (error) {
        res.status(500).send(JSON.stringify(error))
    }
}

const getFirstBatch = async (req, res) => {
    try {
        const perfumesRef = db.collection('perfumes').orderBy('name').limit(8)
        const querySnapshot = await perfumesRef.get()
        const perfumes = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        res.status(200).json(perfumes)
    } catch (error) {
        res.status(500).send(JSON.stringify(error))
    }
}

const getNextBatch = async (req, res) => {
    const lastVisibleId = req.params.id

    try {
        const lastPerfumeRef = db.collection('perfumes').doc(lastVisibleId)
        const lastPerfumeDoc = await lastPerfumeRef.get()

        const perfumesRef = db.collection('perfumes').orderBy('name').startAfter(lastPerfumeDoc).limit(8)
        const querySnapshot = await perfumesRef.get()
        const perfumes = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        res.status(200).json(perfumes)
    } catch (error) {
        res.status(500).send(JSON.stringify(error))
    }
}

const postPerfume = async (req, res) => {
    const perfume = req.body

    try {
        const perfumesRef = db.collection('perfumes')
        const newPerfume = await perfumesRef.add(perfume)
        const perfumeDoc = await newPerfume.get()

        res.status(201).json({
            id: perfumeDoc.id,
            ...perfumeDoc.data()
        })
    } catch (error) {
        res.status(500).send(JSON.stringify(error))
    }
}

const putPerfume = async (req, res) => {
    const id = req.params.id
    const perfume = req.body

    try {
        const perfumeRef = db.collection('perfumes').doc(id)
        await perfumeRef.set(perfume)
        const perfumeDoc = await perfumeRef.get()

        res.status(201).json({
            id: perfumeDoc.id,
            ...perfumeDoc.data()
        })
    } catch (error) {
        res.status(500).send(JSON.stringify(error))
    }
}

const deletePerfume = async (req, res) => {
    const id = req.params.id

    try {
        const perfumeRef = db.collection('perfumes').doc(id)
        await perfumeRef.delete()

        res.status(204).send()
    } catch (error) {
        res.status(500).send(JSON.stringify(error))
    }
}

const postExternalPerfumes = async (req, res) => {
    try {
        const newPerfumes = []

        const perfumesRef = db.collection('perfumes')

        for (let perfume of perfumes) {
            const newPerfume = await perfumesRef.add(perfume)
            const perfumeDoc = await newPerfume.get()
            const perfumeData = perfumeDoc.data()

            newPerfumes.push({
                id: newPerfume.id,
                ...perfumeData
            })
        }

        res.status(201).json(newPerfumes)
    } catch (error) {
        res.status(500).send(JSON.stringify(error))
    }
}

module.exports = {
    getAllPerfumes,
    getFirstBatch,
    getNextBatch,
    postPerfume,
    putPerfume,
    deletePerfume,
    postExternalPerfumes
}
