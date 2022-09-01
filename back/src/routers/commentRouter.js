import is from '@sindresorhus/is';
import { Router } from 'express';
import { CommentModel } from '../db/schemas/comment';
import { login_required } from '../middlewares/login_required';
import { commentService } from '../services/commentService';
import { userAuthService } from '../services/userService';

const commentRouter = Router();

// 댓글달기: comment/add/:userId로 들어왔을때
commentRouter.post(
  '/add/:userId',
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error('정보를 입력해 주세요');
      }
      //방명록 주인의 아이디
      const pageOwner = req.params.userId;

      //writerId=사용자가 로그인할때 쓰는 그 id?
      const user_id = req.currentUserId;

      // const findUser = await userAuthService.getUserInfo({ user_id });
      // const userName = findUser.name;
      // req (request) 에서 데이터 가져오기: comment
      const userName = req.body.userName;
      const comment = req.body.comment;

      // 위 데이터를 유저 db에 추가하기
      const newComment = await commentService.postNewComment({
        pageOwner,
        user_id,
        userName,
        comment,
      });

      if (newComment.errorMessage) {
        throw new Error(newComment.errorMessage);
      }

      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  }
);

//방명록 주인의 모든 댓글을 가지고 올때
commentRouter.get(
  '/list/:userId',
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.userId;
      const allComments = await commentService.page_showAllComments({
        user_id,
      });

      if (allComments.errorMessage) {
        throw new Error(allComments.errorMessage);
      }
      res.status(200).send(allComments);
    } catch (error) {
      next(error);
    }
  }
);

commentRouter.delete('/:Id', login_required, async function (req, res, next) {
  try {
    const deletedComment = await CommentModel.remove({
      _id: req.params.Id,
    });

    if (!deletedComment) {
      throw new Error(deletedComment.errorMessage);
    }

    res.status(200).json({
      message: "It's deleted!",
    });
  } catch (error) {
    next(error);
  }
});

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
commentRouter.get('/afterlogin', login_required, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { commentRouter };
