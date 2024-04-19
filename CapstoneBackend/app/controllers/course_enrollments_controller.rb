class CourseEnrollmentsController < ApplicationController
  before_action :authenticate_user, except: [:index]
  before_action :check_admin_or_instructor, only: [:index]

  def index
    @course_enrollments = CourseEnrollment.all
  end


  def create
    @course_enrollment = CourseEnrollment.new(course_enrollment_params)
    @course_enrollment.user_id = current_user.id
    if @course_enrollment.save
      render json: {message: "You have booked your class"}

    end
  end

  def destroy
    @course_enrollment = CourseEnrollment.find(params[:id])
    @course_enrollment.destroy
    redirect_to course_enrollments_url, notice: 'Enrollment was successfully canceled.'
  end

  private

  def course_enrollment_params
    params.permit(:user_id, :course_id, :enrollment_date, :status)
  end
end
