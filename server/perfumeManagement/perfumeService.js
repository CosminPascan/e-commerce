const db = require('../database/dbConfig')
const perfumes = require('../json_data/perfumes.json')

const getAllPerfumes = async (req, res) => {
    try {
        const perfumesRef = db.collection('perfumes')
        const querySnapshot = await perfumesRef.get()

        const perfumes = querySnapshot.docs.map((doc) => {
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
    postExternalPerfumes
}
