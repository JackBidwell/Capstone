class CoursesController < ApplicationController
  before_action :set_course, only: [:show, :update, :destroy]
  before_action :authenticate_admin, only: [:create, :destroy]
  before_action :check_admin_or_instructor, only: [:update]


  def index
    @courses = Course.includes(:instructor).all
  end


  def show
    @user = Course.find(params[:id])
  end


  def create
    @course = Course.new(course_params)

    if @course.save
      render json: @course, status: :created
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end


  def update
    if @course.update(course_params)
      render json: @course
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end


  def destroy
    @course.destroy
    head :no_content
  end

  private

  def set_course
    @course = Course.find(params[:id])
  end

  def course_params
    params.permit(:name, :description, :start_time, :end_time, :instructor_id, :course_picture)
  end

end
