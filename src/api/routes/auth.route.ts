import { Router } from "express";
import { login, refresh, signup } from "../controllers/auth.controller";
import { auth, authorizeRole } from "../../utils/auth";

const router = Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/refresh", refresh)



router.get("/me", () => { })

router.get("/test", auth, authorizeRole("super_admin"),(req, res)=>{
res.send("This is super sensitive")
})

router.put("/update/:id", () => { })
router.delete("/delete/:id", () => { })


export default router



