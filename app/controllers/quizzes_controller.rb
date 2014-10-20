class QuizzesController < ApplicationController

  def index
    @quizzes = Quiz.all
  end

  def show
    @quiz = Quiz.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render :json => @quiz }
    end
  end

end
