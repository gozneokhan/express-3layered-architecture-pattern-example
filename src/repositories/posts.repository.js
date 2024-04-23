import { prisma } from '../utils/prisma/index.js';

export class PostsRepository {
    findAllPosts = async () => {
        // ORM인 Prisma에서 Posts 모델의 findMany method를 사용해 data를 요청
        const posts = await prisma.posts.findMany();

        return posts;
    };

    findPostById = async (postId) => {
        // ORM인 Prisma에서 Posts 모델의 findUnique method를 사용해 data를 요청
        const post = await prisma.posts.findUnique({
            where: { postId: +postId },
        });

        return post;
    };

    createPost = async (nickname, password, title, content) => {
        // ORM인 Prisma에서 Posts 모델의 create method를 사용해 data를 요청
        const createdPost = await prisma.posts.create({
            data: {
                nickname,
                password,
                title,
                content,
            },
        });

        return createdPost;
    };

    updatePost = async (postId, password, title, content) => {
        // ORM인 Prisma에서 Posts 모델의 update method를 사용해 data를 수정
        const updatedPost = await prisma.posts.update({
            where: {
                postId: +postId,
                password: password,
            },
            data: {
                title,
                content,
            },
        });

        return updatedPost;
    };

    deletePost = async (postId, password) => {
        // ORM인 Prisma에서 Posts 모델의 delete method를 사용해 data를 삭제
        const deletedPost = await prisma.posts.delete({
            where: {
                postId: +postId,
                password: password,
            },
        });

        return deletedPost;
    };
}
