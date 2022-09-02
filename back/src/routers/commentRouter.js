import is from '@sindresorhus/is';
import { Router } from 'express';
import { CommentModel } from '../db/schemas/comment';
import { login_required } from '../middlewares/login_required';
import { commentService } from '../services/commentService';
import { userAuthService } from '../services/userService';

const commentRouter = Router();

// 댓글달기: comment/add/:pageOwner로 들어왔을때
commentRouter.post(
  '/add/:pageOwner',
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error('정보를 입력해 주세요');
      }
      //방명록 주인의 아이디
      const pageOwner = req.params.pageOwner;

      //user_Id=댓글 남길 사용자의 아이디값
      const user_id = req.currentUserId;
      //댓글 남길 유저의 아이디값으로 이름 찾기
      const findUser = await userAuthService.getUserInfo({ user_id });
      const userName = findUser.name;
      // req (request) 에서 댓글 데이터 가져오기
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

//방명록(댓글) 주인의 모든 댓글을 가지고 올때
commentRouter.get(
  '/list/:pageOwner',
  login_required,
  async function (req, res, next) {
    try {
      const pageOwner = req.params.pageOwner;
      const allComments = await commentService.page_showAllComments({
        pageOwner,
      });

      console.log('allComments:', allComments);

      if (allComments.errorMessage) {
        throw new Error(allComments.errorMessage);
      }

      res.status(200).send(allComments);
    } catch (error) {
      next(error);
    }
  }
);

//특정 댓글 지우기 :commentId 특정 comment에 해당하는 _id 값 넣어주기
commentRouter.delete(
  '/:commentId',
  login_required,
  async function (req, res, next) {
    try {
      const deletedComment = await CommentModel.remove({
        _id: req.params.commentId,
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
  }
);

export { commentRouter };
