import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const notices = await prisma.notice.findMany({
            orderBy: [
                {
                    priority: "desc",
                },
                {
                    publishDate: "desc",
                },
            ],
        });

        return res.status(200).json(notices);
    }

    if (req.method === "POST") {
        const notice = await prisma.notice.create({
            data: {
                title: req.body.title,
                body: req.body.body,
                category: req.body.category,
                priority: req.body.priority,
                publishDate: new Date(req.body.publishDate),
                image: req.body.image || null,
            },
        });

        return res.status(201).json(notice);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
}