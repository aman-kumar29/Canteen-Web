import { Router } from "express";
import { sampleFoodData, sampleTags } from "../data.js";

const router = Router();

router.get('/', (req,res)=>{
    res.send(sampleFoodData);
})
router.get('/tags', (req,res)=>{
    res.send(sampleTags);
})
router.get('/search/:searchTerm', (req,res)=>{
    const {searchTerm} = req.params;
    const foods = sampleFoodData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods);
})
router.get('/tag/:tag', (req,res)=>{
    const {tag} = req.params;
    const foods = tag == 'All'? sampleFoodData : sampleFoodData.filter(item => item.tags?.includes(tag));
    res.send(foods);
})
router.get('/:foodId', (req,res)=>{
    const {foodId} = req.params;
    const foods = sampleFoodData.find(item => item.id===foodId);
    res.send(foods);
})

export default router;

